// 예시 API

export interface TurnOnResponse {
  status: string;
  code: number;
  msg: string;
}

export const turnOn = async (): Promise<TurnOnResponse> => {
  try {
    const response = await fetch('https://10.237.129.238/turnon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('turnOn data:', data);

    if (!response.ok) {
      throw new Error('turnOn API 호출에 실패했습니다.');
    }

    return {
      status: data.status,
      code: data.code,
      msg: data.msg,
    };
  } catch (error) {
    console.error('turnOn API 호출 오류:', error);
    throw error;
  }
};


export const turnOff = async (): Promise<any> => {
  try {
    const response = await fetch('https://10.237.129.238/turnoff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("d")

    const data = await response.json();
    console.log('turnOff data:', data);

    if (!response.ok) {
      throw new Error('turnOn API 호출에 실패했습니다.');
    }

    return {
      status: data.status,
      code: data.code,
      msg: data.msg,
    };
  } catch (error) {
    console.error('turnOn API 호출 오류:', error);
    throw error;
  }
};

