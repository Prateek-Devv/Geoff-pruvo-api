import { createApp } from './app';
import { AppDataSource } from './config/database';

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DataSource has been initialized!');

    const app = createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during DataSource initialization:', error);
    process.exit(1);
  }
};

startServer();