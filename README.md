# CallPulse AI - Public Product Showcase / Публичная витрина продукта

[Русская версия](#русский) | [English version](#english)

---

## Русский

CallPulse AI - единая платформа голосовой автоматизации для продаж, контакт-центров и сервисных подразделений. Она объединяет анализ звонков, голосового AI-оператора для входящих обращений, AI-автообзвон, CRM, базу знаний (RAG) и контроль затрат в одном технологическом контуре.

### Что демонстрирует репозиторий

- Архитектуру трёх взаимосвязанных продуктов: анализ звонков, входящий Voice AI и исходящие кампании.
- Разделение Control Plane (настройки, кампании, CRM-команды) и Voice Runtime (контур обработки звонка в реальном времени).
- Публичный mock API с безопасными синтетическими данными для звонков, лидов, кампаний, базы знаний, согласий и затрат.
- Контракты интеграции и подход к безопасности, надёжности, RAG и эксплуатации.

### Что намеренно не публикуется

- Закрытый production-код, инфраструктурные конфигурации и коммерческие реализации.
- Ключи, токены, SIP-реквизиты, записи разговоров, персональные и клиентские данные.
- Дампы баз данных, резервные копии и операционные наборы данных.

### Важное уточнение

Это публичная продуктовая витрина и архитектурная документация. Mock API иллюстрирует интерфейсы и сценарии; он не является телефонией, не совершает звонки и не заменяет защищённый production-контур. Архитектурные характеристики и показатели производительности должны подтверждаться в конкретном контуре нагрузочными и эксплуатационными тестами.

### Модули платформы

- **Call Intelligence**: загрузка и приём записей, транскрибация, контроль качества, риски, рекомендации и аналитика.
- **Inbound Voice AI**: приём входящего звонка, диалог с RAG, сбор данных, перевод на сотрудника и сохранение результата.
- **Outbound AI Campaigns**: кампании обзвона, сценарии, статусы попыток, согласия/DNC и передача результата в CRM.
- **CRM и Control API**: лиды, воронки, следующие действия, идемпотентные команды и аудит изменений.
- **Knowledge, Billing и Operations**: версионируемая база знаний, учёт STT/LLM/TTS, контроль бюджета, мониторинг и диагностика.

### Быстрый запуск mock API

```bash
cd mock-api
npm install
npm run start
```

Mock API будет доступен по адресу `http://localhost:8090`. Его эндпоинты и ограничения описаны в [документации](docs/README.md).

### Документация

- [Архитектурная справка на русском](docs/ARCHITECTURE_REFERENCE_RU.md) - полный целевой промышленный контур.
- [Краткий обзор архитектуры на английском](docs/ARCHITECTURE_OVERVIEW_EN.md).
- [Индекс документации / Documentation index](docs/README.md).

---

## English

CallPulse AI is a unified voice-automation platform for sales, contact centres, and service operations. It brings call intelligence, inbound Voice AI, outbound AI campaigns, CRM, knowledge retrieval (RAG), and cost control into one technology stack.

### What this repository demonstrates

- The architecture of three connected products: call analysis, inbound Voice AI, and outbound campaigns.
- Separation between the Control Plane (configuration, campaigns, CRM commands) and the real-time Voice Runtime.
- A public mock API with safe synthetic data for calls, leads, campaigns, knowledge bases, consent, and usage.
- Integration contracts and the approach to security, reliability, RAG, and operations.

### What is intentionally excluded

- Private production source code, infrastructure configuration, and commercial implementations.
- Keys, tokens, SIP credentials, call recordings, customer data, and personal data.
- Database dumps, backups, and operational datasets.

### Important scope note

This is a public product showcase and architecture reference. The mock API demonstrates contracts and scenarios; it is not a telephony system, does not place calls, and does not replace a protected production runtime. Architecture characteristics and performance figures must be validated with load and operational testing in the applicable deployment environment.

### Platform modules

- **Call Intelligence**: recording ingestion, transcription, quality control, risk detection, recommendations, and analytics.
- **Inbound Voice AI**: inbound call handling, RAG-backed dialogue, data collection, human handoff, and conversation outcome capture.
- **Outbound AI Campaigns**: calling campaigns, scenarios, attempt states, consent/DNC checks, and CRM result delivery.
- **CRM and Control API**: leads, pipelines, next actions, idempotent commands, and change auditing.
- **Knowledge, Billing, and Operations**: versioned knowledge, STT/LLM/TTS usage accounting, budget controls, monitoring, and diagnostics.

### Quick start: mock API

```bash
cd mock-api
npm install
npm run start
```

The mock API is available at `http://localhost:8090`. See the [documentation index](docs/README.md) for endpoints and constraints.

### Documentation

- [Full Russian architecture reference](docs/ARCHITECTURE_REFERENCE_RU.md).
- [English architecture overview](docs/ARCHITECTURE_OVERVIEW_EN.md).
- [Documentation index](docs/README.md).
