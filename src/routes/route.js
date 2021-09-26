import checkToken from 'middlewares/token.middleware';
import AuthRouter from '../modules/Auth/auth.route'

const MasterRouter = (app) => {
    app.use('/api/auth', AuthRouter);

}

export default MasterRouter;