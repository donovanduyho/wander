const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload.access == 'student') {
            Promise.all([
                findStudentByPid(jwt_payload.pid),
                findAdminByPid(jwt_payload.pid)
            ]).then(results => {
                // no result for student is found
                if (!results[0]) return done(null, false);

                if (!results[1])
                    return done(null, results[0])

                // result for student and result for admin found, combining the results into one object.
                else {
                    let user = {
                        ...results[0],
                        ...results[1]
                    };
                    return done(null, user)
                }
            })
            .catch(err => {
                console.log(err); 
                throw err;
            });
        } else if (jwt_payload.access = 'super admin') {
                findSABySpid(jwt_payload.spid).then(data => {
                    if (data)
                        return done(null, data);
                    return done(null, false);
                }).catch(err => console.log(err));
            }
        })
        );
    };
