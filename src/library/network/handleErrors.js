export function handleError (error: any) {
  const { status, message } = error;
  switch (status) {
    case 401:
    	message = 'You are unauthenticated'
      // do something when you're unauthenticated
    case 403:
    	message = 'You are unauthorized to access a resource'
      // do something when you're unauthorized to access a resource
    case 500:
    	message = 'Server exploded. We will back on track'
      // do something when your server exploded
    default:
    	message = 'Normal Error. We are fixing it now ...'
      // handle normal errors with some alert or whatever
  }
  return message; // I like to get my error message back
}