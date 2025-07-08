export interface values {
  email: string,
  password: string

}


export const HandleSignIn = async (values: values, url: string):Promise<Response | void> => {
  try {
    const { email, password } = values

    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })

    })
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(JSON.stringify(res))
    return res

  } catch (err) {
    console.log(err)
  }

}
