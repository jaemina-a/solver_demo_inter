// 폼 제출 API

export interface FormData {
  source: number[]; // List[int] - discord: 0, slack: 1
  position: number; // int - 0~8 (개발자, 디자이너, 경리, 개인 비서, PM, CS, 마케터, 기획, HR)
  needs: string; // string
}

export interface FormGoResponse {
  status: string,
  code: number,
  msg: string
}

export const submitForm = async (formData: FormData): Promise<FormGoResponse> => {
  // TODO: API 구현
  // 엔드포인트: /form/go
  // 요청 형식: { source: List[int], position: int, needs: string }

  try {
    const response = await fetch('https://solverton_demo01.fosyl021029.my/form/go', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: formData.source,
        position: formData.position,
        needs: formData.needs,
      }),
    });
    const data = await response.json()
    console.log('data : ', data)
    if (!response.ok) {
      throw new Error('폼 제출에 실패했습니다.');
    }
    return ({
      status: data.status,
      code: data.code,
      msg: data.msg
    })
    // 성공 처리
  } catch (error) {
    console.error('API 호출 오류:', error);
    // 네트워크 오류인 경우 더 구체적인 메시지 제공
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`네트워크 오류: 서버에 연결할 수 없습니다. (${error.message})`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`알 수 없는 오류: ${String(error)}`);
  }
};

