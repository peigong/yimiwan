import { catchHandler } from '@/wx/util/ui'
import { UserType, getUser, setUserType } from '@/service/user'

export default {
  mounted(){
    getUser().then(user => {
      this.userType = user.type || UserType.None
    })
    .catch(catchHandler)
  },
  data(){
    return {
      userType: UserType.None
    }
  },
  computed: {
    showUserSwitch: function(){ return UserType.None === +this.userType },
    showApplicant: function(){ return UserType.Applicant === +this.userType },
    showRecruiter: function(){ return UserType.Recruiter === +this.userType },
    showHeadhunter: function(){ return UserType.Headhunter === +this.userType },
    showAdministrator: function(){ return UserType.Administrator === +this.userType }
  },
  methods: {
    resetUserType(){
      this.userType = UserType.None
      setUserType(UserType.None)
    }
  }
}
