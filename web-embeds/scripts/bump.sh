TYPE=$1
if [ -z "$TYPE" ]; then
	TYPE="patch"
fi
VERSION="$(npm show @apollosproject/apollos-embeds version)"
npm version "$VERSION"
npm version "$TYPE"
