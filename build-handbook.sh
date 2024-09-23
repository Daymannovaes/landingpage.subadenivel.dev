#!/bin/bash

# Check if correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 source_directory target_directory"
    exit 1
fi

SOURCE_DIR=$1
TARGET_DIR=$2

# Create the target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy directory structure but not files
find "$SOURCE_DIR" -type d | while read DIR; do
    # Replace source directory path with target directory path
    TARGET_SUBDIR="${DIR/$SOURCE_DIR/$TARGET_DIR}"
    mkdir -p "$TARGET_SUBDIR"
done

# Process all files in the source directory
find "$SOURCE_DIR" -type f | while read FILE; do
    EXT="${FILE##*.}"

    # Replace .md files with .html using showdown
    if [ "$EXT" = "md" ]; then
        # Generate corresponding target file path
        TARGET_FILE="${FILE/$SOURCE_DIR/$TARGET_DIR}"
        TARGET_FILE="${TARGET_FILE%.md}.html"

        # Convert the .md file to .html and save it in the target directory
        npx showdown makehtml -i "$FILE" -o "$TARGET_FILE"
        echo "Converted $FILE to $TARGET_FILE"
    else
        # For other file types, just copy them
        TARGET_FILE="${FILE/$SOURCE_DIR/$TARGET_DIR}"
        cp "$FILE" "$TARGET_FILE"
        echo "Copied $FILE to $TARGET_FILE"
    fi
done
