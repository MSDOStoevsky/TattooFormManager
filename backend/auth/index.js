var uuid = require('node-uuid');

function S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function token_gen() {
    return (S4()+S4()+S4()+S4()+S4()+S4());
}

module.exports = {
    authorize: (basic, db, res) => {
        var auth_arr;
        var un_pw;

        try
        {
            auth_arr = basic.split(" ");
        }
        catch(err)
        {
            res(400, null);
        }

        if(auth_arr[0] === "Basic")
        {
            un_pw = Buffer.from(auth_arr[1], 'base64').toString('ascii').split(":");
            db.query("user", {'un': un_pw[0]}, function(ret){
                /* no user with that un */
                if(ret.length === 0)
                    res(403, null);

                /* correct match */
                else if(un_pw[1] === ret[0].pw )
                    res (null, token_gen());

                /* incorrect password */
                else res (403, null);
            });
        }
        else res(400, null);
    }

}