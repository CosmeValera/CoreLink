#!/bin/bash

HOOKS_ROOT_DIR="$(dirname "${BASH_SOURCE[0]}")/.."
SCRIPT="$HOOKS_ROOT_DIR/prepare-commit-msg.sh"

function set_up_before_script() {
  export TEST=true
}

function tear_down_after_script() {
  unset TEST
  unset SCRIPT
}

function test_SAFe_approach() {
  export TEST_BRANCH="feature/G2IOVGCS-667"
  assert_equals "PSW:AGGREGATOR:ISC:G2IOVGCS-667 My commit message" "$($SCRIPT "My commit message")"
}

function test_ignore_all_when_using_SAFe_ISC_aproach() {
  export TEST_BRANCH="feature/G2IOVGCS-668"
  assert_equals "" "$($SCRIPT "PSW:AGGREGATOR:ISC:G2IOVGCS-668 My commit message")"
}

function test_ignore_all_when_using_SAFe_None_aproach() {
  export TEST_BRANCH="feature/G2IOVGCS-667"
  assert_equals "" "$($SCRIPT "PSW:AGGREGATOR:ISC:None No task commit")"
}

function test_ignore_all_when_using_SAFe_AR_aproach() {
  export TEST_BRANCH="feature/G2IOVGCS-667"
  assert_equals "" "$($SCRIPT "PSW:AGGREGATOR:AR:None This is an anomaly")"
}


function test_ignore_all_when_using_SAFe_SPR_aproach() {
  export TEST_BRANCH="feature/G2IOVGCS-667"
  assert_equals "" "$($SCRIPT "PSW:AGGREGATOR:SPR:None This is a SPR")"
}
