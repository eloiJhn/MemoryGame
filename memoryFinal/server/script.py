import requests
import re

TOKEN = 'YOUR_GITHUB_TOKEN'
OWNER = 'YOUR_GITHUB_USERNAME_OR_ORG_NAME'
REPO = 'YOUR_REPOSITORY_NAME'
BRANCH = 'YOUR_BRANCH_NAME'
HEADERS = {
    'Authorization': f'token {TOKEN}',
    'Accept': 'application/vnd.github.v3+json'  # Utilisez la version v3 pour récupérer les commits
}

# Récupérer les commits récents de la branche spécifiée
commits_url = f'https://api.github.com/repos/{OWNER}/{REPO}/commits?sha={BRANCH}'
response = requests.get(commits_url, headers=HEADERS)
commits = response.json()

# Set pour stocker les numéros d'issue uniques associés à la branche
associated_issues = set()

# Parcourir chaque commit pour vérifier s'il mentionne une issue
for commit in commits:
    message = commit['commit']['message']
    issue_numbers = re.findall(r'#(\d+)', message)  # Trouver tous les numéros d'issue mentionnés
    for issue_number in issue_numbers:
        associated_issues.add(issue_number)

# Affichez toutes les issues associées à la branche
print(f"Issues associated with branch {BRANCH}: {', '.join(associated_issues)}")
