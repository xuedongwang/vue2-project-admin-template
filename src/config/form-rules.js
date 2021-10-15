export const account = [
  { required: true, message: '请输入帐号', trigger: 'blur' },
  { min: 4, max: 20, message: '帐号长度为4-20', trigger: 'blur' }
];
export const password = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 4, max: 20, message: '密码长度为4-20', trigger: 'blur' }
];