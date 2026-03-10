/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here

  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const data = [];

  /*
   *   // CSK: played=2, won=1, tied=1, points=3
   *   // MI: played=1, won=0, lost=1, points=0
   *   // RCB: played=1, tied=1, points=1
   *   // Sorted: CSK(3), RCB(1), MI(0)
   */

  matches.forEach((match) => {
    const { result, team1, team2, winner } = match;

    // team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number

    const firstTeamData = {
      team: team1,
      played: 1,
      noResult: result === "no_result" ? 1 : 0,
      tied: result === "tie" ? 1 : 0,
      lost: result === "win" && winner !== team1 ? 1 : 0,
      won: result === "win" && winner === team1 ? 1 : 0,
      points: result === "win" ? (winner === team1 ? 2 : 0) : 1,
    };

    const secondTeamData = {
      team: team2,
      played: 1,
      noResult: result === "no_result" ? 1 : 0,
      tied: result === "tie" ? 1 : 0,
      lost: result === "win" && winner !== team2 ? 1 : 0,
      won: result === "win" && winner === team2 ? 1 : 0,
      points: result === "win" ? (winner === team2 ? 2 : 0) : 1,
    };

    const firstTeamDataIndex = data.findIndex((_) => _.team === team1);
    const secondTeamDataIndex = data.findIndex((_) => _.team === team2);

    if (firstTeamDataIndex === -1) {
      data.push(firstTeamData);
    } else {
      const currentData = structuredClone(data[firstTeamDataIndex]);

      data[firstTeamDataIndex] = {
        ...currentData,
        played: currentData.played + 1,
        noResult: currentData.noResult + firstTeamData.noResult,
        tied: currentData.tied + firstTeamData.tied,
        lost: currentData.lost + firstTeamData.lost,
        won: currentData.won + firstTeamData.won,
        points: currentData.points + firstTeamData.points,
      };
    }

    if (secondTeamDataIndex === -1) {
      data.push(secondTeamData);
    } else {
      const currentData = structuredClone(data[secondTeamDataIndex]);

      data[secondTeamDataIndex] = {
        ...currentData,
        played: currentData.played + 1,
        noResult: currentData.noResult + secondTeamData.noResult,
        tied: currentData.tied + secondTeamData.tied,
        lost: currentData.lost + secondTeamData.lost,
        won: currentData.won + secondTeamData.won,
        points: currentData.points + secondTeamData.points,
      };
    }
  });

  const sortedData = [...data].sort(
    (a, b) => b.points - a.points || a.team.localeCompare(b.team),
  );

  return sortedData;
}

const result = iplPointsTable([{ team1: "RCB", team2: "DC", result: "tie" }]);

console.table(result);
