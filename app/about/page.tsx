'use client';

import styles from './about.module.css';
import NavBar from '../components/NavBar';

export default function About() {
  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>About Me</h1>
        
        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              Hi, I&apos;m Camille, a data professional with 6+ years of experience turning
              complex, messy data into decisions that actually move businesses forward. I
              specialize in data analytics, machine learning, and automation, building
              everything from end-to-end pipelines to AI-driven solutions that eliminate
              inefficiencies and surface insights that matter. I bring a rare combination
              of technical depth and finance domain expertise, which means I don&apos;t just
              build data solutions. I understand the business problems behind them.
            </p>
            
            <h2>Specializations</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillItem}>
                <h3>Building Data Infrastructure That Scales</h3>
                <p>
                  I design and maintain end-to-end data pipelines from ingestion and
                  transformation to modeling and visualization so data is always
                  accurate, accessible, and ready to use.
                </p>
              </div>
              <div className={styles.skillItem}>
                <h3>Turning Data Into Decisions</h3>
                <p>
                  I transform raw, complex data into clear, actionable insights through
                  dashboards, automated reporting, and analytics workflows that help
                  businesses move faster and smarter.
                </p>
              </div>
              <div className={styles.skillItem}>
                <h3>Automating What Slows You Down</h3>
                <p>
                  I build Python and Google Apps Script-based automation solutions that
                  eliminate repetitive manual processes, reducing hours of work to
                  minutes with measurable efficiency gains of up to 95%.
                </p>
              </div>
              <div className={styles.skillItem}>
                <h3>Applying AI Where It Matters</h3>
                <p>
                  I apply machine learning, NLP, and AI-driven techniques to real
                  business problems, from analyzing customer feedback to building
                  predictive models that support strategic decision-making.
                </p>
              </div>
            </div>

            <h2>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillItem}>
                <h3>Data & Analytics</h3>
                <ul>
                  <li>Python</li>
                  <li>SQL (SQLite, MySQL)</li>
                  <li>Pandas, NumPy, SciPy</li>
                  <li>Matplotlib, Seaborn</li>
                  <li>Google Apps Script</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Business Intelligence & Visualization</h3>
                <ul>
                  <li>Tableau</li>
                  <li>Power BI (DAX, Power Query)</li>
                  <li>ClicData</li>
                  <li>Streamlit</li>
                  <li>DOMO</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Machine Learning & AI</h3>
                <ul>
                  <li>Linear and Logistic Regression</li>
                  <li>K-Means Clustering</li>
                  <li>Sentiment Analysis</li>
                  <li>Topic Modeling</li>
                  <li>Text Classification, NLP</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Data Engineering & Pipelines</h3>
                <ul>
                  <li>ETL and ELT Pipelines</li>
                  <li>API Integration</li>
                  <li>Data Reconciliation</li>
                  <li>Process Automation</li>
                  <li>Apache Airflow (Learning), dbt (Learning)</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>OCR & Document Processing</h3>
                <ul>
                  <li>Tesseract</li>
                  <li>OCRmyPDF</li>
                  <li>Unstructured Data Extraction</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>AI Tools</h3>
                <ul>
                  <li>Claude Code</li>
                  <li>Cursor</li>
                  <li>DOMO AI</li>
                  <li>Antigravity</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Cloud & Data Warehousing</h3>
                <ul>
                  <li>Microsoft Azure (AZ-900 in progress)</li>
                  <li>Snowflake</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Developer & Collaboration Tools</h3>
                <ul>
                  <li>Git and GitHub</li>
                  <li>Jupyter Notebook</li>
                  <li>VS Code</li>
                  <li>Excel</li>
                  <li>Google Workspace, Microsoft 365</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Project Management</h3>
                <ul>
                  <li>JIRA</li>
                  <li>Monday.com</li>
                  <li>ClickUp</li>
                  <li>Trello</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Enterprise & ERP Systems</h3>
                <ul>
                  <li>Xero</li>
                  <li>Oracle</li>
                  <li>Salesforce</li>
                  <li>EDI</li>
                  <li>RevPro (Zuora)</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
