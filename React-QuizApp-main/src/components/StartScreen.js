

function StartScreen({ numQuestions, dispatch, name, users}) {


  const containerStyle = {
    overflowX: 'auto',
    fontSize: "1.5em" 
  };
  const tableStyle = {
    marginTop: '2rem',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    width: '100%',
    minWidth: '600px',
  };
  const headerCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };
  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  return (
    <div className="start">
      <h2> {name}, Welcome to The Quiz!</h2>
      <h3>{numQuestions} questions to test your knowledge</h3>
      <button
        className="btn btn-ui m-1"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
      <button
        className="btn btn-ui m-1"
        onClick={() => dispatch({ type: "logout" })}
      >
        Logout
      </button>
      <div style={containerStyle}>
        <table style={ tableStyle }>
          <thead>
            <tr>
              <th style={headerCellStyle}>Rank</th>
              <th style={headerCellStyle}>Name</th>
              <th style={headerCellStyle}>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id}>
                <td style={cellStyle}>{idx + 1}</td>
                <td style={cellStyle}>{u.name}</td>
                <td style={cellStyle}>{u.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StartScreen;
