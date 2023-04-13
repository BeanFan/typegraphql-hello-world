import { Arg, Args, Query, Resolver } from "type-graphql";

@Resolver()
class FirstResolver{

    userList = [
        {id:1,
        name:"jerry"},
        {id:2,
        name:"Lalit"}
    ]
    
    @Query()
    getUserList(@Arg("id") id:number){
        return this.userList.filter((user)=>{
            return user.id>id
        })
    }
}

export default FirstResolver;