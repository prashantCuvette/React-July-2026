import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useAuth();
  console.log(user)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>My Notes App</h2>
          </div>

          <div className={styles.rightSection}>
            <nav className={styles.nav}>
              <Link className={styles.link} to="/task">
                Tasks
              </Link>
              <Link className={styles.link} to="/notes">
                Notes
              </Link>
            </nav>

            <button className={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </div>
      <div className={styles.welcomeText}>
        Welcome, {user.name.toUpperCase()}! Please select Tasks or Notes to get Started. Your email is {user.email}.
      </div>
    </>
  );
};

export default Header;
