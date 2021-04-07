export interface Node {
  id: string,
  name: string,
  children?: Array<Node>,
}