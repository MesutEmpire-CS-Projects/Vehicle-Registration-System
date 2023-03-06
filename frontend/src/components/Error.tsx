import { useRouteError } from "react-router-dom";

const ErrorPage = (props: any) => {
  const error: any = useRouteError();

  return (
    <div className="my-3 error_container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {props.fetchError ? (
        <p>{props.fetchError}</p>
      ) : error ? (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ErrorPage;
