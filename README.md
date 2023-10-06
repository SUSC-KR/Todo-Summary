## Todo-Summary

완료되지 않은 할 일들을 모아 정리해서 디스코드로 보내줍니다.

### Feature

- 각 디스코드 채널에, 해당 팀에 부여된 업무를 요약해서 보여준다.
- 각 디스코드 채널에, 해당 팀의 팀원들 각각에게 부여된 업무를 요약해서 보여준다.

### Specification

이때, 요약은 다음과 같이 되어야 한다.

```
@[팀 이름 혹은 팀원 이름]
- [우선 순위] [[업무 이름]](업무 바로가기 링크) | [만기일] | 생성자: [생성자]
```

[우선 순위]의 형태는 다음과 같다.

```
:red_square:         - 매우 높음
:orange_square:      - 높음
:yellow_square:      - 보통
:green_square:       - 낮음
:blue_square:        - 매우 낮음
:white_large_square: - 없음
```

[만기일]의 형태는 다음과 같다. 아래에서 계산하는 모든 날짜 연산은 KST(UTC+9)를 기준으로 한다.

1. 만기일이 존재하고, 아직 만기일이 도래하지 않은 경우
   ```
   ~ yyyy.MM.dd. (n일 남음)
   ```
2. 만기일이 존재하고, 오늘이 만기일인 경우
   ```
   ~ yyyy.MM.dd. (오늘까지)
   ```
3. 만기일이 존재하고, 만기일을 초과한 경우
   ```
   ~ yyyy.MM.dd. (n일 초과)
   ```
4. 만기일이 존재하지 않는 경우
   ```
   만기일 없음
   ```

각 요약 정보는 다음과 같은 순서로 정렬되어야 한다.

1. 우선 순위가 높을수록 앞에 와야 한다.
2. 오늘 날짜에서 만기일을 뺀 값이 작을수록 앞에 와야 한다. 만기일이 없다면 뒤에 와야 한다.
3. 업무가 생성된 일시가 빠를수록 앞에 와야 한다.

### Environment

- Node.js v18
- Typescript v5

### Setup

```shell
$ git clone https://github.com/SUSC-KR/Todo-Summary.git
$ npm install
```

### Run

```shell
$ npm run build
$ npm run start
```

### Require environments
