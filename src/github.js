const API = "https://api.github.com";

async function github(path, token = process.env.GITHUB_TOKEN) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "legendary-waddle",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const user = process.argv[2] || "octocat";
  const repos = await github(`/users/${user}/repos?sort=updated&per_page=5`);
  for (const r of repos) console.log(`${r.full_name}  ★${r.stargazers_count}`);
}

if (require.main === module) main().catch((e) => (console.error(e.message), process.exit(1)));

module.exports = { github };
