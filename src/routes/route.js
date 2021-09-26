import checkToken from 'middlewares/token.middleware';

const MasterRouter = (app) => {
    app.use('/api/auth', AuthRouter);

}

export default MasterRouter;