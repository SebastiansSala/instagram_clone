import React, {useEffect} from "react";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function GoogleButton({setCurrentUser}) {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const checkUser = async (user) => {
    let exists = false;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (user.uid === doc.data().userID) exists = true;
    });

    if (!exists) {
      try {
        await addDoc(collection(db, "users"), {
          userID: user.uid,
          username: user.displayName,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [setCurrentUser, auth.currentUser]);

  const getUser = async (user) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userData = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().userID === user.uid) {
        userData = doc.data();
      }
    });
    return userData;
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        checkUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        navigate("/login");
      });
  };

  return (
    <button
      className="rounded-md bg-blue-400 px-3 py-1 text-white mb-6 text-base lg:text-base md:text-xl"
      onClick={handleClick}
    >
      Continue with Google
    </button>
  );
}
