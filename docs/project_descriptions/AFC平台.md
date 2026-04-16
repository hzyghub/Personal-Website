# AFC数据智能分析平台

## 一句话定位

基于 DuckDB + FastAPI + React 的地铁AFC（自动售检票）离线数据分析平台，将西安地铁14号线机场段海量交易数据转化为8大可视化分析能力，推动运营管理从"经验判断"向"数据驱动"转型。

## 业务背景与痛点

### 业务场景

西安地铁14号线西段（机场西站至西安北站），共10个站点，日均客运量约5.2万乘次，年客运量约1900万乘次。线路连接西安咸阳国际机场与西安北站两大交通枢纽，是城市对外交通的重要通道。

AFC系统每天产生大量交易数据，来自四个独立数据源：AFC系统交易（consume_trade_ud）、二维码支付（qrcode_trade_ud）、长安通（iccard_trade_ud）、交通联合卡（jticcard_trade_ud），日均约6.27万条交易记录。

### 核心痛点

1. **有数据无分析**：大量业务数据沉淀在生产系统（GBase 8t，运行在Solaris服务器上），但缺乏可视化分析工具，无法快速洞察客流规律
2. **决策依赖经验**：客流组织、设备配置、人员排班主要依靠经验判断，缺乏数据支撑
3. **多源数据割裂**：四种支付渠道的交易数据格式各异（字段名不同、编码不同、进出站识别逻辑不同），无法统一分析
4. **ACC与AFC口径差异**：ACC官方报表与AFC原始统计存在差异，缺乏工具进行对比校核
5. **数据分析门槛高**：需要编写SQL查询数据库，非技术人员无法自主获取数据洞察

### 开发背景

本项目由一线运维人员利用业余时间独立完成，借助 Claude Code（AI辅助开发工具）作为主力开发协作工具。开发者具备地铁AFC运营业务专家背景，非专业软件工程师，业余自学人工智能两年，自费采购AI开发工具，零公司成本完成MVP原型验证。累计投入250+小时，AI交互超10亿Tokens。

## 我的具体工作

### 架构设计

**整体架构决策**：设计了"离线导出、最小暴露、可审计"的系统架构。数据从生产系统通过CSV离线导出，在本地DuckDB中进行脱敏和分析，前后端完全分离。这一决策的核心考虑是：生产系统运行在Solaris + GBase 8t上，无法直接连接进行实时分析，离线方式既安全又不影响生产。

**演进式架构设计**：采用 core/api/v1/enterprise 三层分离架构。MVP阶段的代码就是正式项目的基础，不是一次性原型。DuckDB表结构按正式项目需求设计，包含Phase 2预留字段（节假日、天气、航班数据等），API采用 `/api/v1/`（MVP冻结版）+ `/api/v2/`（正式增强版）版本化策略。预估MVP代码复用率：数据层95%、API层80%、前端基础组件90%。

**技术选型变更**：项目初期设计使用 SQLite + Flask + ECharts，经过评估后变更为 DuckDB + FastAPI + React + Ant Design。核心原因：
- DuckDB列式存储，聚合查询比SQLite快5-10倍，适合分析场景
- FastAPI内置Swagger文档（`/docs`），原生async/await支持，Pydantic v2自动类型校验
- React + TypeScript + Ant Design提供企业级UI组件库和类型安全

**前端原子化组件架构**：设计了 WidgetCard 通用容器 + 业务Widget 的两层组件体系。每个分析板块都是独立、自包含的组件，内置数据获取（React Query）、加载状态（Skeleton）、错误边界。39个Widget组件按页面分组，在Page中直接import使用。Phase 2引入react-grid-layout拖拽配置时，MVP组件零改动即可复用。

### ETL与数据处理

**四来源统一入仓**：这是项目最核心的数据工程挑战。四种交易来源（consume/iccard/jticcard/qrcode）的字段名、类型、编码各不相同：

| 差异点 | consume_trade_ud | qrcode_trade_ud | iccard_trade_ud | jticcard_trade_ud |
|--------|-----------------|-----------------|-----------------|-------------------|
| CSV编码 | GB18030 | GB18030 | GB18030 | GB18030 |
| 分隔符 | \| | \| | \| | \| |
| 进站时间字段 | entry_time | 无（需配对） | entry_trade_time | entry_trade_time |
| 进站标识 | trade_state: 88,89,90 | qr_trade_type: '10' | trade_state: 12,14 | trade_state: 12,14 |
| 卡号字段 | card_serial_number | user_id | card_serial_number | card_serial_number + ticket_phy_id |
| 设备类型格式 | 十六进制(1F) | 数值(1) | 十进制(130449) | 十进制 |

设计了 `ETL字段映射与清洗规则` 文档（v1.2），精确到每个字段的映射关系和转换逻辑，作为ETL开发的蓝图。实现了 CSVLoader → DataMasker → DuckDBLoader 三阶段管道。

**二维码OD配对（ODPairingProcessor）**：二维码交易没有entry_station_id字段（因为是即时扣费），需要通过 `user_hash + qr_trade_type` 配对进出站记录来构造OD。实现逻辑：qr_trade_type='10'为进站、'11'为出站，同一user_hash配对，出站时间>进站时间，时间差<=180分钟，每个进站配对最早的出站。使用DuckDB窗口函数（QUALIFY ROW_NUMBER）高效完成配对。配对成功率>80%，达到CP4验收标准。

**ACC报表集成（ACCReportLoader）**：实现了13种ACC官方Excel报表的自动识别和解析。通过正则匹配文件名 + 标题行关键词双重识别报表类型，站名智能映射（ACC中文站名含别名自动映射到dim_station.station_id），幂等导入（同一日期重复导入先DELETE再INSERT，不产生重复数据）。14张acc_*表写入DuckDB。

**数据脱敏（DataMasker）**：实现三层脱敏策略，符合《网络安全法》和等保2.0/3.0合规要求：
- 卡号字段（card_serial_number/user_id/user_card_id/ticket_phy_id）：MD5不可逆哈希，输出32位十六进制字符串
- 时间字段（trade_time/entry_time）：截断到小时级（YYYYMMDDHH），去除分钟和秒
- 操作员字段（operator_id）：掩码为 `XX**XX` 格式（保留前2位和后2位）
- 脱敏必须在DuckDB加载前完成，敏感数据不得以明文持久化存储
- 每次脱敏操作生成审计日志（JSON格式，包含时间戳、批次ID、源文件、记录数、脱敏字段列表）

**运营日边界处理**：发现并正确处理了一个关键的日期概念差异：`balance_date`（运营日期）和自然日期不同。运营日切换时间为凌晨02:00，00:00-01:59的交易归属于前一运营日。所有客流统计必须使用 `balance_date_key`，不能使用 `trade_time_hour_key // 100`。

### 分析模块

实现了8大分析模块，对应7个分析引擎和1个AI模块：

**1. OD客流分析（ODAnalyzer）**：基于fact_passenger_flow表生成OD矩阵，支持按站点、时段、来源类型筛选。实现了CP4验证：西安北站早高峰(7-9点)出站>进站（换入客流），机场西站晚高峰(17-19点)出站>进站（修正了原假设"进站>出站"的错误判断——晚高峰人们是离开机场回家而非到达机场）。输出包括OD矩阵、站点流量排名、热门路径统计。

**2. 时段热力图（HeatmapGenerator）**：生成站点 x 小时的客流热力矩阵，计算乘降量（进站+出站）。高峰时段自动识别（可配置阈值，默认均值1.5倍），支持进站/出站/总量三种模式切换。

**3. 设备负载分析（DeviceLoadAnalyzer）**：分析AGM（闸机）/TVM（售票机）/BOM（半自动售票机）/PCA的负载率。设备理论通过量标准基于业务规则：AGM 30人/分钟、TVM 5人/分钟、BOM 10人/分钟。负载状态三级分级：正常(<50%)、高负载(50-80%)、过载(>80%)。通过device_type_mapping表标准化不同来源的设备类型编码。

**4. 换入客流分析（TransferInAnalyzer）**：分析从14号线以外站点进入、从14号线西段10站出站的换入客流。四个维度分析：来源站分布、来源线路分布、时段分布、票种分布。基于trade_state精确识别换入乘客。

**5. 机场T5专项分析（AirportT5Analyzer）**：T5航站楼为新开通航站楼，对比T5(station_id=1423)与机场西(station_id=1421)的进出站量、客流占比。自动计算T5客流的环比变化率，评估航站楼间客流转移效果。

**6. 设备故障分析（DeviceFaultAnalyzer）**：基于85,566条真实故障记录进行分析。按故障趋势（日/周/月）、故障部件（闸机扇门、售票机找零器等）、故障严重程度（严重/一般/轻微）多维度分析。可配置阈值自动标记高风险设备。

**7. ACC数据集成（ACCODAnalyzer + ACCAFCComparator）**：ACC官方报表提供AFC原始数据无法计算的指标——路径分配后的精确OD矩阵、15分钟级断面流量、精确换乘量、出行特征（平均乘距、乘站数、乘车时间）。ACCAFCComparator逐站对比ACC与AFC进出站量差异，差异超5%自动标记异常。

**8. AI智能问答**：详见"AI集成"章节。

### AI集成

**Text-to-SQL引擎**：在 `routes/ai.py` 中实现了 TextToSQLEngine 类，将自然语言问题自动转换为DuckDB SQL查询。基于关键词模式匹配（换入/高峰/OD/票种/站点排名等），生成对应的SQL和业务解释。生成的SQL自动填入日期范围参数后执行DuckDB查询。

**多LLM适配器架构**：设计了工厂模式的多LLM适配器系统（`core/llm/`）：
- `BaseLLMAdapter`：抽象基类，定义 `chat()` 异步流式接口
- `OpenAIAdapter`：兼容OpenAI API格式的统一适配器
- `LLMProvider`：9家厂商常量（阿里云百炼、智谱AI、DeepSeek、月之暗面、MiniMax、OpenAI、Anthropic、Google、自定义）
- `create_llm_adapter()` 工厂函数：根据provider自动创建适配器实例，为不同厂商设置默认base_url

**SSE流式响应**：AI聊天端点（`/api/v1/ai/chat`）使用 FastAPI StreamingResponse 实现 SSE（Server-Sent Events）。响应分为四个阶段流式输出：thinking（思考中）→ sql（生成SQL）→ data（查询结果）→ answer（LLM分析回答）。前端通过EventSource API实时接收，实现逐字输出效果。

**LLM配置透传**：用户在前端LLM配置面板选择厂商、填入API Key和模型名称，配置通过HTTP Header（X-LLM-Provider/X-LLM-API-Key/X-LLM-Model/X-LLM-Base-Url）透传到后端，后端动态创建对应的LLM适配器。不存储用户的API密钥。

**智能推荐问题**：`/api/v1/ai/suggested-questions` 端点根据当前分析上下文（general/transfer-in/od/heatmap）返回预设推荐问题，帮助用户快速开始。

### 前端交互

**技术栈**：React 19 + TypeScript + Ant Design 6 + Vite 8 + @tanstack/react-query v5。

**8个页面**：DashboardPage（数据概览）、ODAnalysisPage（OD分析）、HeatmapPage（热力图）、TicketOperationsPage（票务运营）、DeviceLoadPage（设备负载）、DeviceFaultPage（设备故障）、AirportT5Page（T5专项）、AIChatPage（AI助手）。

**39个Widget组件**：按业务语义归属到各专题页。每个Widget都是独立自包含的组件：WidgetCard统一容器 + 具体业务逻辑。WidgetCard提供统一的标题栏、加载骨架屏（Skeleton）、错误提示（Alert）、刷新功能。

**AI聊天组件**（`components/ai/`）：ChatContainer、ChatInput、MessageBubble、LLMConfigPanel、MarkdownRenderer、SmartSidebar。MarkdownRenderer使用react-markdown + rehype-highlight实现Markdown和代码高亮渲染。

**状态管理**：服务端状态使用@tanstack/react-query v5（API数据缓存、自动刷新、错误重试），本地UI状态使用useState。不使用Redux或Zustand。

**主题设计**：采用毛玻璃（Glassmorphism）+ 霓虹光效的深色科技风设计。统一浅色主题策略（`useChartTheme` 返回固定配色），不使用深色模式。

## 关键技术决策与思考

### 为什么选DuckDB而不是PostgreSQL/MySQL？

DuckDB是嵌入式列式分析数据库，无需部署独立服务，直接操作本地文件。在分析场景下：
- 聚合查询性能比传统行式数据库快5-10倍（列式存储只读取需要的列）
- 零配置、零运维，单文件数据库，适合个人开发机环境
- 完美支持窗口函数、CTE等分析型SQL
- 配合pandas DataFrame无缝互操作（`fetchdf()` 直接返回DataFrame）
- 限制：单进程写入（ETL单进程设计兼容此限制），不适合高并发写入场景（本项目不需要）

### 为什么选FastAPI而不是Flask？

从Flask迁移到FastAPI的核心原因：
- 内置Swagger UI（`/docs`），自动生成API文档，展示给领导时即是专业亮点
- 原生async/await支持，DuckDB同步查询用 `asyncio.to_thread()` 封装
- Pydantic v2自动请求/响应类型校验，减少手写验证代码
- 不使用 `duckdb-async`（实验性包，不稳定）

### 为什么用离线CSV导出而不是直连数据库？

生产系统运行在Solaris + GBase 8t（Informix兼容）上，环境封闭且关键。离线方式确保：
- 零影响生产系统性能和稳定性
- 数据脱敏在导入DuckDB前完成，生产环境无泄露风险
- 不需要网络打通或权限申请，降低安全风险

### 为什么二维码OD需要特殊配对？

二维码交易的支付模式与其他三种不同：扫码即时扣费，进出站是两条独立记录（通过qr_trade_type区分'10'进站/'11'出站），不像储值卡有完整的entry_station_id字段。需要通过user_id（脱敏后的user_hash）关联同一用户的进出站记录，构造完整OD。这是项目中技术难度最高的数据工程问题之一。

### 抵消交易过滤的设计考量

通过config.yaml配置需要过滤的trade_state码（16/17/18/79/80/81），这些是钱包增值撤消、定期增值撤消等抵消类交易，不应纳入正常客流统计。将过滤规则外置到配置文件而非硬编码，便于业务人员调整。

### 脏数据处理策略

采用"宽容模式"：跳过脏行并记录日志，失败率超过阈值时终止。关键是阈值按数据源差异化配置：AFC系统交易3%（格式规范）、长安通3%、交通一卡通5%、二维码8%（格式更不稳定）。这个差异化的阈值来自对L1真实数据的验证结论。

### 生产环境导出方案

生产服务器是Solaris系统，Shell必须用 `#!/bin/sh`（不支持bash），数据库是GBase 8t，导出使用 `dbschema` + `UNLOAD` 命令，字符编码是GB18030。专门编写了 `export_ddl_supplement_direct.sh` 脚本，一次一个表稳定导出。SQL文件不能含中文注释。

## 量化成果

### 数据规模

| 指标 | 数值 |
|------|------|
| DuckDB表数量 | 40+张（18维度表 + 8事实表 + 14张ACC表） |
| 交易数据时间范围 | 2026-01-01 至 2026-03-19 |
| 四来源日均交易量 | 约62,700条（L1实测） |
| 设备故障记录 | 85,566条（真实数据） |
| ACC报表类型 | 13种官方Excel报表 |

### 代码规模

| 模块 | 规模 |
|------|------|
| 后端API端点 | ~35个（11个路由文件） |
| 前端页面 | 8个 |
| 前端Widget组件 | 39个 |
| 分析引擎 | 7个独立Analyzer |
| ETL管道组件 | 6个（CSVLoader/DataMasker/DuckDBLoader/DimensionLoader/ODPairingProcessor/ACCReportLoader） |
| LLM适配厂商 | 9家（OpenAI兼容格式统一适配） |

### 性能指标（本地开发机实测）

| 查询类型 | 目标响应时间 |
|---------|------------|
| 单站单日客流 | <= 500ms |
| 全网OD矩阵（10站） | <= 3s |
| 30天热力图 | <= 2s |
| 单站设备负载 | <= 1s |

### 投入产出

- 个人业余时间投入：250+小时（工作日每天4-5小时 + 周末全天）
- 公司成本：零
- 开发工具：Claude Code（AI辅助开发），累计交互超10亿Tokens
- 预期年度经济效益（中性假设）：95-140万元

## 项目亮点（适合展示在简历/作品集的）

**1. 业务专家零基础独立完成全栈开发**：作为地铁AFC运营业务专家（非软件工程师），借助Claude Code完成了从数据管道到前端可视化到AI集成的全栈开发。证明了"领域专家 + AI辅助工具"可以实现传统需要完整开发团队才能完成的工作量。

**2. 四来源统一入仓 + 二维码OD配对**：解决了AFC系统最复杂的数据工程问题——将四种格式各异的交易来源（AFC系统交易/二维码/长安通/交通联合卡）统一入仓分析，其中二维码OD配对通过user_hash + qr_trade_type实现，配对成功率>80%。

**3. 生产级数据安全合规设计**：三层脱敏策略（MD5哈希+时间截断+操作员掩码）、全流程审计日志、生产与分析环境物理隔离。严格遵循《网络安全法》《数据安全法》和等保2.0/3.0要求。

**4. ACC官方数据集成与数据质量对比**：实现了13种ACC官方Excel报表的自动识别解析（正则匹配+标题行双重识别、站名智能映射、幂等导入），并构建ACC vs AFC逐站对比机制，差异超5%自动标记异常。

**5. AI智能问答：Text-to-SQL + 多LLM适配器**：自然语言提问自动生成DuckDB SQL查询，查询结果交给用户自选的大模型（支持9家厂商，通过OpenAI兼容格式统一适配）生成流式分析报告。SSE流式响应实现逐字输出效果，前端Markdown渲染支持代码高亮。

**6. 演进式架构设计**：MVP代码即生产基础，数据层预估95%复用到正式项目。前端原子化组件架构（WidgetCard + 39个Widget），Phase 2引入拖拽配置时组件零改动。API版本化（v1冻结/v2扩展），数据库预留Phase 2字段。
