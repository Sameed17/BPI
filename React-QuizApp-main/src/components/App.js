import QuizApp from "./QuizApp";
import SignIn from "./SignIn";
import HomePage from "./HomePage";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function App() {
  const db = getFirestore();
  const [isStart, setIsStart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = sessionStorage.getItem("isLoggedIn");
    return saved ? JSON.parse(saved) : null;
  });
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(false);               // ← loading state

  const [topUsers, setTopUsers] = useState([]);

  // Fetch top 5 users by score on mount
  useEffect(() => {
    async function fetchTopUsers() {
      const usersRef = collection(db, "users");
      const topQuery = query(usersRef, orderBy("score", "desc"), limit(5));
      const snapshot = await getDocs(topQuery);
      const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTopUsers(users);
    }
    fetchTopUsers();
  }, [db]);

  // Persist login flag…
  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    } else {
      sessionStorage.removeItem("isLoggedIn");
      setUserDoc(null);
    }
  }, [isLoggedIn]);

  // Fetch Firestore doc when logged in
  useEffect(() => {
    if (isLoggedIn?.uid) {
      setLoading(true);                                        // ← start loading
      const userRef = doc(db, "users", isLoggedIn.uid);
      getDoc(userRef)
        .then((snap) => {
          if (snap.exists()) {
            setUserDoc({ id: snap.id, ...snap.data() });
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));                     // ← stop loading
    }
  }, [isLoggedIn, db]);                                       // :contentReference[oaicite:3]{index=3}

  // Update score only if higher
  const updateScore = async (newScore) => {
    if (!isLoggedIn?.uid) return;
    const userRef = doc(db, "users", isLoggedIn.uid);
    const snap = await getDoc(userRef);
    const currentScore = snap.exists() && snap.data().score != null
      ? snap.data().score
      : 0;
    if (newScore > currentScore) {
      await updateDoc(userRef, { score: newScore });
      setUserDoc({ id: snap.id, ...snap.data(), score: newScore });
    }
  };

  // Conditional rendering: show loading until userDoc is ready
  if (isStart && isLoggedIn && loading) {
    return (
      <div
        style={{
          position: 'fixed',      // cover viewport :contentReference[oaicite:1]{index=1}
          top: 0,
          left: 0,
          width: '100vw',         // full width :contentReference[oaicite:2]{index=2}
          height: '100vh',        // full height :contentReference[oaicite:3]{index=3}
          backgroundColor: `#343a40`, // solid black :contentReference[oaicite:4]{index=4}
          display: 'flex',        // center loader :contentReference[oaicite:5]{index=5}
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999            // on top of everything
        }}
      >
        <Loader />
      </div>
    );
  }
  

  return isStart
    ? isLoggedIn
      ? <QuizApp
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={userDoc}
          updateScore={updateScore}
          users={topUsers}
        />
      : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsStart={setIsStart}/>
    : <HomePage isStart={isStart} setIsStart={setIsStart}/>;
}

