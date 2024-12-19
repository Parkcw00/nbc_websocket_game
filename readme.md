<h1>웹소켓 게임 만들기</h1>

<h2>프로젝트 개요<h2>
<p>"Node.js와 웹소켓 활용한 사이드뷰 플랫폼 점프액션 게임 만들기"</p>

<h3>1. 패키지 매니저</h3>
<p><strong>npm</strong> 또는 <strong>yarn</strong> 중 편한 것을 이용합니다.</p>
<p>🚨 <strong>주의사항</strong> - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다. - <code>package-lock.json</code>, <code>yarn.lock</code>이 동시에 있으면 안됩니다. (의도와 다른 동작을 일으킬 수 있습니다.)</p>

<h3>2. 모듈 시스템</h3>
<p>기본 모듈 시스템(<strong>CommonJS, type: "commonjs"</strong>) 또는 ES6 부터 도입된 모듈 시스템(<strong>ESModule, type: "module"</strong>)을 이용합니다.</p>
<p>🚨 <strong>주의사항</strong> - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다. - <code>require/exports</code>와 <code>import/export</code>가 동시에 있으면 안됩니다.</p>

<p>--------------------------------------------------------<p>

<p>***깃허브 규칙***<p>
<table style="font-size: 12px;">
  <tr>
    <th>작업 타입</th>
    <th>작업내용</th>
  </tr>
  <tr>
    <td>✨ update</td>
    <td>해당 파일에 새로운 기능이 생김</td>
  </tr>
  <tr>
    <td>🎉 add</td>
    <td>없던 파일을 생성함, 초기 세팅</td>
  </tr>
  <tr>
    <td>🐛 bugfix</td>
    <td>버그 수정</td>
  </tr>
  <tr>
    <td>♻️ refactor</td>
    <td>코드 리팩토링</td>
  </tr>
  <tr>
    <td>🩹 fix</td>
    <td>코드 수정</td>
  </tr>
  <tr>
    <td>🚚 move</td>
    <td>파일 옮김/정리</td>
  </tr>
  <tr>
    <td>🔥 del</td>
    <td>기능/파일을 삭제</td>
  </tr>
  <tr>
    <td>🍻 test</td>
    <td>테스트 코드를 작성</td>
  </tr>
  <tr>
    <td>💄 style</td>
    <td>css</td>
  </tr>
  <tr>
    <td>🙈 gitfix</td>
    <td>gitignore 수정</td>
  </tr>
  <tr>
    <td>🔨script</td>
    <td>package.json 변경(npm 설치 등)</td>
  </tr>
</table>

## 완료된 필수 기능

## 📝 기획한 내용들

- [x] **시간에 따른 점수 획득**
  - [x] 스테이지 구분
  - [x] 스테이지에 따른 점수 획득 구분
- [x] **아이템 획득**
  - [x] 아이템 획득 시 점수 획득
  - [x] 스테이지 별 아이템 생성 구분
  - [x] 아이템 별 획득 점수 구분

### 4. 어려웠던 점과 프로젝트 소감

[트러블슈팅](https://parkcw0325.tistory.com/37)
