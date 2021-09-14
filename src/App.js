import BubbleChart from './bubble-chart'
import object from './data.json'
import './bubble-chart.css';

function App()
{

  var options = {
    content: {
      inProgressBackgroundColor: "#fd89da",
      completedBackgroundColor: "#6d41ff"
    },
    contentType: {
      fontSize: "11px",
      strokeColor: "white",
    },
    hashTag: {
      fontSize: "11px",
      strokeColor: "white",
    }
  };

  return (
    <div>

      <BubbleChart
        data={object}
        options={options}
        width="860"
        height="860"
      />

    </div>
  );
}

export default App;
