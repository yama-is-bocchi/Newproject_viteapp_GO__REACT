package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Wantlist holds the schema definition for the Wantlist entity.
type Wantlist struct {
	ent.Schema
}

// Fields of the Wantlist.
func (Wantlist) Fields() []ent.Field {
	return []ent.Field{
		field.String("title").
		NotEmpty(),
		field.Int("user_id"),
	}
}

// Edges of the Wantlist.
func (Wantlist) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("wantlists").
			Field("user_id").
			Unique().
			Required(),
	}
}
