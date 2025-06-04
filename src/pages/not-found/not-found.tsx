import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Oops! A página que você está procurando não foi encontrada.</p>
      <Link to="/" style={styles.link}>
        Voltar para a página inicial
      </Link>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'center' as const,
    padding: '2rem',
  },
  code: {
    fontSize: '6rem',
    marginBottom: '1rem',
    color: '#ff6b6b',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  link: {
    fontSize: '1.2rem',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
};

export default NotFound;
