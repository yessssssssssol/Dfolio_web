import React, { useState, useEffect } from "react";
import KakaoLogin from "react-kakao-login";

const Kakao = () => {
	useEffect(() => {
    if (typeof window !== "undefined") {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    }
  }, []);

	/* 
	<img
			className="kakaoLogo" 
			src="img/kakao.png" 
			alt="kakao 간편 로그인 로고" 
			style={{ 
				width: "50px",
				margin: "25px 20px" 
			}}
			onClick={handleClickKakao}
		/>
	*/

	return (
		<KakaoLogin
        token={String(process.env.NEXT_PUBLIC_KAKAO_APP_KEY)}
        onSuccess={() => {console.log("로그인성공");}} // 성공 시 실행할 함수
        onFail={(err) => {
          console.log("로그인실패", err);
        }}
        onLogout={() => {
          console.log("로그아웃");
        }}
        render={({ onClick }) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            카카오로 로그인하기
          </div>
        )}
      ></KakaoLogin>
	)
}

export default Kakao;
