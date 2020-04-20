'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const cwd = require('../lib/cwd');
const process = require('process');

describe('cwd', () => {
  before((done) => {
    sinon
      .stub(process, 'cwd')
      .returns('/');

    done();
  });

  it('should return subpath with leading slash', () => {
    expect(cwd('/package.json')).to.equal('/package.json');
  });

  it('should return subpath without leading slash', () => {
    expect(cwd('package.json')).to.equal('/package.json');
  });
});
