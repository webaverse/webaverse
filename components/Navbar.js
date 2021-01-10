import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useAppContext } from "../libs/contextLib";
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { globalState, setGlobalState } = useAppContext();

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarMenu}>
  
            <div className={styles.leftMenuContainer}>
              <Link href="/">
                <img className="logo" src="/webaverse.png" alt="Webaverse logo" />
              </Link>
            </div>
  
            <div className={styles.secondaryMenu}>
              <Link href="/assets"><a className={styles.item}>Assets</a></Link>
              <Link href="/land"><a className={styles.item}>Land</a></Link>
              <Link href="/profiles"><a className={styles.item}>Profiles</a></Link>
              <Link href="/mint"><a className={styles.item}>Mint</a></Link>
              <a className={styles.item} href="https://docs.webaverse.com">Docs</a>
              <a className={styles.item} href="https://webaverse.github.io/whitepaper/whitepaper.pdf">Whitepaper</a>
            </div>
  
            <div className={styles.rightMenuContainer}>
              <a className={styles.item} href="https://discord.gg/R5wqYhvv53">Join Our Discord</a>
            </div>
            <div>
              { globalState.address ?
                <a href={"/profiles/" + globalState.address}>
                  <img className={`${styles.accountPicture} ${styles.loggedIn}`} src={globalState.avatarPreview ? globalState.avatarPreview.replace(/\.[^.]*$/, '.png') : "/preview.png"} />
                </a>
              :
                <Link href="/settings">
                  <img className="accountPicture" src="/preview.png" alt="Placeholder profile picture" />
                </Link>
              }
            </div>
  
        </div>
      </div>
    </div>
  )
}

export default Navbar;