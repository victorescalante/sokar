export default function ({ $auth }) {
  let user = $auth.state.user;
  console.log('user ', user);
}
