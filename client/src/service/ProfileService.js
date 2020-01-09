import axios from 'axios';


class ProfileService{

    updateUser(user){
        return axios.put('http://localhost:8080/profile/' + user.user_id + '/edit', user);
    }

}

export let profileService = new ProfileService();

