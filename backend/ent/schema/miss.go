package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)
// Miss holds the schema definition for the Miss entity.
type Miss struct {
	ent.Schema
}

// Fields of the Miss.
func (Miss) Fields() []ent.Field {
	return []ent.Field{
		field.Int("user_id").
			Unique(),
		field.Int("count").
		     Max(5),
	}
}

// Edges of the Miss.
func (Miss) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("misses").
			Field("user_id").
			Unique().
			Required(),
	}
}
