function confirmModal() {
  if (window.confirm("정말 탈퇴하시겠습니까??")) {
    return 1;
  } else {
    return 0;
  }
}

export default confirmModal;
