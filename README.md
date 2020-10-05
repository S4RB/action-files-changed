# Action Files Changed

Takes a directory name as input and return `'true'` or `'false'` if any of the files within the directory have changed.

## Usage

Setup the step in your workflow `.yml` file

```
- name: Check if folder changed
  id: folderChanged
  uses: S4RB/action-files-changed@main
  with:
  directory: <The directory you're looking at>
```

Run your workflow step conditionally based on the actions output

```
- name: Run step if files have changed
  if: ${{ step.folderChanged.outputs.hasChanged == 'true' }}
  run: |
  ...
```
