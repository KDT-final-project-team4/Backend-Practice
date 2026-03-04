# 🚀 Backend Practice - SNS API (FastAPI)

이 프로젝트는 React 프론트엔드와 통신하며 회원가입, 로그인(JWT), 사진이 포함된 게시글 CRUD 기능을 제공하는 FastAPI 기반의 백엔드 연습 프로젝트입니다.

## 🛠 기술 스택
* **Framework:** FastAPI
* **Database:** MySQL
* **ORM:** SQLAlchemy
* **Authentication:** JWT (JSON Web Tokens)
* **Data Validation:** Pydantic

---

## 📂 폴더 구조 (Layered Architecture)

유지보수와 협업을 위해 기능별로 계층을 나누어 개발합니다.

```text
backend/
├── routers/               # API 라우터 (엔드포인트 및 컨트롤러 역할)
│   ├── user_router.py     # 회원가입, 로그인, 내 정보 조회 API
│   └── post_router.py     # 게시글 작성, 조회, 삭제 API
├── models/                # 데이터베이스 스키마 정의 (SQLAlchemy)
│   └── models.py          # User, Post 테이블 정의
├── schemas/               # 입출력 데이터 검증 (Pydantic)
│   └── schemas.py         # Request/Response 데이터 형태 정의
├── utils/                 # 공통 유틸리티 및 미들웨어
│   ├── security.py        # 비밀번호 해싱 및 JWT 생성/검증
│   └── dependencies.py    # 토큰 해독 및 현재 유저 식별 (Depends)
├── uploads/               # 갤러리/게시글 업로드 이미지 저장소
├── database.py            # MySQL DB 연결 및 세션 관리
├── main.py                # FastAPI 진입점 (앱 실행, CORS 설정, 라우터 등록)
├── requirements.txt       # 의존성 패키지 목록
└── .env                   # 환경변수 (DB 접속 정보, JWT 시크릿 키 - Git 제외 필수)
```

---

## 📝 백엔드 개발 및 작성 순서

팀원들과 아래의 순서대로 개발을 진행하면 의존성 충돌 없이 원활하게 기능을 완성할 수 있습니다.

### Step 1. 환경 설정 및 DB 연결
1. `requirements.txt`를 통한 패키지 설치 (`fastapi`, `sqlalchemy`, `pymysql`, `python-multipart` 등)
2. 루트 경로에 `.env` 파일을 생성하고 `DATABASE_URL`과 `SECRET_KEY` 작성
3. `database.py`에 SQLAlchemy 엔진 및 `SessionLocal` 설정

### Step 2. 데이터베이스 모델링 (`models/`)
1. MySQL에 생성될 테이블 구조 정의
2. `User` 모델 (이메일, 비밀번호, 닉네임) 작성
3. `Post` 모델 (내용, 이미지 경로, 작성자 외래키) 작성 및 관계(Relationship) 설정

### Step 3. 데이터 검증 스키마 작성 (`schemas/`)
1. 프론트엔드와 주고받을 JSON 형태를 Pydantic 모델로 정의
2. 가입 요청(`UserCreate`), 로그인 응답(`Token`), 게시글 응답(`PostResponse`) 등 작성

### Step 4. 보안 및 인증 로직 구현 (`utils/`)
1. `passlib`을 활용한 비밀번호 해싱 및 검증 함수 구현
2. `python-jose`를 활용한 JWT Access Token 발급 함수 구현
3. API 요청 시 헤더의 토큰을 읽어 유저 정보를 반환하는 의존성(`get_current_user`) 구현

### Step 5. 유저 API 구현 (`routers/user_router.py`)
1. `POST /api/users/signup`: 회원가입 (DB에 해싱된 비밀번호 저장)
2. `POST /api/users/login`: 로그인 및 JWT 토큰 반환
3. `GET /api/users/me`: 현재 로그인한 유저 정보 반환 (새로고침 시 로그인 유지용)

### Step 6. 게시글 API 구현 (`routers/post_router.py`)
1. `GET /api/posts`: 전체 게시글 목록 및 작성자 정보 반환
2. `POST /api/posts`: 게시글 작성 (텍스트 및 사진 파일 업로드 처리, `uploads/` 폴더 저장)
3. `DELETE /api/posts/{id}`: 본인이 작성한 게시글 삭제 권한 검증 및 삭제 처리

### Step 7. 메인 앱 조립 (`main.py`)
1. 프론트엔드 URL(`http://localhost:5173` 등)에 대한 CORS 미들웨어 추가
2. 작성한 `user_router`, `post_router` 등록
3. 업로드된 이미지를 프론트에서 볼 수 있도록 `StaticFiles`를 이용해 `/uploads` 경로 마운트

---

## ▶️ 실행 방법

```bash
# 가상환경 생성 및 활성화 (선택)
python -m venv venv
source venv/bin/activate  # Windows는 venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 서버 실행
uvicorn main:app --reload
```
* 서버가 실행되면 `http://localhost:8000/docs`에서 Swagger UI를 통해 API 테스트가 가능합니다.
