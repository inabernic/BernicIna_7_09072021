export default {
  isConnectedUserOwnerOf(objectWithUserId) {
    let loggedUserId = JSON.parse(localStorage.user).userId;
    return loggedUserId == objectWithUserId.UserId;
  },
  isConnectedUserAdmin() {
    return JSON.parse(localStorage.user).isAdmin == 1;
  },
};
