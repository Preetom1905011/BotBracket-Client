import React from "react";
import "../styles/elimbracket.css";

export default function ElimBracket() {
  return (
    <div className="elim-bracket">
      <ul>
        <li class="game game-top winner">
          Lousville <span>79</span>
        </li>
        <li>&nbsp;</li>
        <li class="game game-bottom ">
          NC A&T <span>48</span>
        </li>

        <li>&nbsp;</li>

        <li class="game game-top winner">
          Colo St <span>84</span>
        </li>
        <li>&nbsp;</li>
        <li class="game game-bottom ">
          Missouri <span>72</span>
        </li>

        <li>&nbsp;</li>

        <li className="game game-top winner">
          Duke <span>73</span>
        </li>
        <li>&nbsp;</li>
        <li className="game game-bottom ">
          Albany <span>61</span>
        </li>

        <li>&nbsp;</li>

        <li className="game game-top winner">
          Colo St <span>84</span>
        </li>
        <li>&nbsp;</li>
        <li className="game game-bottom ">
          Missouri <span>72</span>
        </li>
      </ul>

      <ul>
        <li className="game game-top winner">
          Lousville <span>85</span>
        </li>
        <li>&nbsp;</li>
        <li className="game game-bottom ">
          Duke <span>63</span>
        </li>

        <li>&nbsp;</li>

        <li className="game game-top winner">
          Lousville <span>85</span>
        </li>
        <li>&nbsp;</li>
        <li className="game game-bottom ">
          Duke <span>63</span>
        </li>
      </ul>
    </div>
  );
}
