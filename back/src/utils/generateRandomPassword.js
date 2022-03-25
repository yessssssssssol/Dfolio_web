// 랜덤 패스워드 생성
export default () => {
  if (process.env.GRADER) {
    return "00000000";
  }

  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(8, "0");
};
