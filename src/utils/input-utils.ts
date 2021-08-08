import inquirer from 'inquirer'

export const yesNoPrompt = async (query: string): Promise<boolean> => {
  const ans = await inquirer.prompt([
    { type: 'confirm', message: query, name: 'confirm' },
  ])

  return ans.confirm
}
