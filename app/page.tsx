import { Home } from "./components/home";
import { ConfigProvider, Space } from 'antd';

export default async function App() {
  return (
    <>
    <ConfigProvider
        theme={{
          token: {
            "colorPrimary": "rgb(233, 30, 99)",
            "colorInfo": "rgb(233, 30, 99)"
          },
        }}
      >
      <Home />
    </ConfigProvider>
      
    </>
  );
}
