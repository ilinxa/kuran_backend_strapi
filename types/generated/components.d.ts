import type { Schema, Struct } from '@strapi/strapi';

export interface LayerDeepnote extends Struct.ComponentSchema {
  collectionName: 'components_layer_deepnotes';
  info: {
    displayName: 'deepnote';
  };
  attributes: {
    index_number: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    key_word: Schema.Attribute.String;
    note: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutSurahe extends Struct.ComponentSchema {
  collectionName: 'components_layout_surahes';
  info: {
    displayName: 'surah';
  };
  attributes: {
    description: Schema.Attribute.Text;
    index_number: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    name_arabic: Schema.Attribute.String & Schema.Attribute.Required;
    name_turkish: Schema.Attribute.String & Schema.Attribute.Required;
    order_of_revelation: Schema.Attribute.Integer;
    type: Schema.Attribute.Enumeration<['Mekki', 'Medeni']>;
    verse_count: Schema.Attribute.Integer;
    verses: Schema.Attribute.Component<'layout.verses', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutVerses extends Struct.ComponentSchema {
  collectionName: 'components_layout_verses_s';
  info: {
    displayName: 'verses ';
  };
  attributes: {
    arabic_text: Schema.Attribute.String & Schema.Attribute.Required;
    deep_notes: Schema.Attribute.Component<'layer.deepnote', true> &
      Schema.Attribute.Required;
    index_number: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    turkish_text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layer.deepnote': LayerDeepnote;
      'layout.surahe': LayoutSurahe;
      'layout.verses': LayoutVerses;
    }
  }
}
