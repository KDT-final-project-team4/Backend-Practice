## 1. DB 스키마 설계 (MySQL 테이블)
## 2. 백엔드 폴더 구조 설계
- 📂 FastAPI 기반 Layered Architecture 폴더 구조
```
backend/
├── app/
│   ├── config/          # DB 설정, JWT 보안 설정 (Express의 src/config)
│   ├── controller/      # 비즈니스 로직 처리 (Express의 src/controllers)
│   ├── router/          # 엔드포인트 정의 (Express의 src/router)
│   ├── middleware/      # 인증 및 보안 필터 (Express의 src/middleware)
│   ├── models/          # DB 테이블 정의 (SQLAlchemy 모델)
│   ├── schemas/         # 데이터 검증 모델 (Pydantic 모델)
│   └── utils/           # 공통 유틸리티 (Express의 src/utils)
├── uploads/             # 업로드된 이미지가 저장될 실제 폴더
├── main.py              # 앱 실행 및 초기 설정 (Express의 app.mjs)
├── database.py          # DB 연결 세션 관리
└── .env                 # 환경 변수
```
---
### 🛠 핵심 코드 설계
1. Config: 환경 설정 (app/config/settings.py)
    - Node.js의 dotenv와 db.mjs 역할을 수행합니다.
    
2. Router: 길잡이 (app/router/post_router.py)
    - Node.js의 src/router/postRouter.mjs와 대응됩니다. 요청을 받고 컨트롤러로 넘깁니다.
    
3. Controller: 로직 수행 (app/controller/post_controller.py)
    - Node.js의 src/controllers/postController.mjs와 대응됩니다. 실질적인 DB 작업과 파일 처리를 합니다.

4. Middleware: 인증 (app/middleware/auth_middleware.py)
    - Node.js의 authMiddleware.mjs 역할을 수행합니다. 토큰을 검증하여 유저 정보를 반환합니다.

5. Entry Point: 조립 (main.py)
    - Node.js의 app.mjs 역할을 하며, 모든 설정을 한데 모읍니다.
    
      
