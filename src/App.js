import './App.css';
import { Board } from './components/Board';
import { getDateString, keyGen, useLocalStorage } from './util';

function App() {
  const [columns, setColumns] = useLocalStorage('appData', []);
  const onNewColumn = (newColumnName) => {
    const timeStamp = getDateString(new Date());
    setColumns((columns) => [
      ...columns,
      {
        name: newColumnName,
        cards: [],
        createdAt: timeStamp,
        id: `column_${keyGen(newColumnName, timeStamp)}`,
      },
    ]);
  };
  const onRemoveColumn = (index) => {
    setColumns((columns) => {
      const clone = [...columns];
      clone.splice(index, 1);
      return clone;
    });
  };
  const onColumnChange = (changes) => {
    setColumns((columns) => {
      const clone = [...columns];
      changes.forEach(({ index, column }) => {
        clone[index] = column;
      });
      return clone;
    });
  };

  const onColumnReorder = (columns) => {
    setColumns(columns);
  };

  return (
    <div className='App'>
      <Board
        columns={columns}
        onNewColumn={onNewColumn}
        onRemoveColumn={onRemoveColumn}
        onColumnChange={onColumnChange}
        onColumnReorder={onColumnReorder}
      ></Board>
    </div>
  );
}

export default App;
