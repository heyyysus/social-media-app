import { User } from '../src/users/users.models'

declare global{
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}