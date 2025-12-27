import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import '../css/custom.css';
import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="floating-shapes">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Heading as="h1" className="hero__title">
          Aaliya Raheem – Humanized AI Robot Hakatoon Book
        </Heading>
        <p className="hero__subtitle">Physical AI and Humanoid Robotics Course Textbook</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Start Learning
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore Chapters
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Aaliya Raheem – Humanized AI Robot Hakatoon Book">
      <HomepageHeader />
      <main>
        {/* You can add more sections here if needed */}
      </main>
    </Layout>
  );
}
