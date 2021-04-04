import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import "./App.css";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import Question from "./components/Question";
import TagButtons from "./components/TagButtons";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const everyTag = useSelector((state) => Object.values(state.tag));
  const userId = useSelector((state) => state.session.user?.id)

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <div className='top-grid'>
              {
                userId
                  ?
                  <>
                    <TagButtons everyTag={everyTag} userId={userId} />
                    <Feed userId={userId} />
                  </>
                  :
                  <>
                    <div className='filler-div'></div>
                    <div className='splash'>
                      <h1 className="splash-h1">Welcome to Quartermaster!</h1>
                      <h2 className="splash-h2">Log in to join the fun!</h2>
                    </div>
                  </>
              }
              {/* <TagButtons everyTag={everyTag} userId={userId} />
              <Feed userId={userId} /> */}
            </div>
          </Route>
          <Route path={`/api/question/:id`}>
            <div className='top-grid'>
              <TagButtons everyTag={everyTag} userId={userId} />
              <Question />
            </div>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;