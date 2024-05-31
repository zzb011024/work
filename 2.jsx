import React, { useState, useEffect } from 'react';

interface UserDataProps {
  userId: string;
}

interface User {
  name: string;
  email: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    fetchUserData();
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  useEffect(() => {
    if (user) {
      console.log('用户数据已更新：', user);
    }
  }, [user]);

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('获取用户数据时出错：', error));
  };

  return (
    <div>
      <h1>用户数据组件</h1>
      {user ? (
        <div>
          <p>姓名：{user.name}</p>
          <p>邮箱：{user.email}</p>
        </div>
      ) : (
        <p>正在加载用户数据...</p>
      )}
      <p>计时器：{seconds} 秒</p>
    </div>
  );
};

export default UserData;
